import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// GET full profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne({});
    res.json(profile || { skills: [], projects: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST new skill
router.post('/skills', async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) return res.status(400).json({ error: 'Skill is required' });

    const profile = await Profile.findOneAndUpdate(
      {},
      { $addToSet: { skills: skill } },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST new project
router.post('/projects', async (req, res) => {
  try {
    const { title, description, links } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const project = {
      title,
      description: description || '',
      links: links ? (Array.isArray(links) ? links : [links]) : []
    };

    const profile = await Profile.findOneAndUpdate(
      {},
      { $push: { projects: project } },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET search for skills/projects
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const profile = await Profile.findOne({});
    if (!profile) return res.json({ projects: [], skills: [] });

    const projects = (profile.projects || []).filter(p =>
      p.title.toLowerCase().includes(q.toLowerCase())
    );
    const skills = (profile.skills || []).filter(s =>
      s.toLowerCase().includes(q.toLowerCase())
    );

    res.json({ projects, skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
