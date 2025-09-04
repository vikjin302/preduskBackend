import express from 'express';
import Profile from '../models/Profile.js';
const router = express.Router();

// GET profile
router.get('/', async (req, res) => {
    const profile = await Profile.findOne();
    res.json(profile);
});

// POST profile
router.post('/', async (req, res) => {
    const profile = new Profile(req.body);
    await profile.save();
    res.json(profile);
});

// PUT profile
router.put('/', async (req, res) => {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
    res.json(profile);
});

// GET projects by skill
router.get('/projects', async (req, res) => {
    const skill = req.query.skill;
    const profile = await Profile.findOne({ "skills": skill });
    if (!profile) return res.json([]);
    const projects = profile.projects.filter(p => p.skills?.includes(skill) || p.title.toLowerCase().includes(skill));
    res.json(projects);
});

// GET top skills
router.get('/skills/top', async (req, res) => {
    const profile = await Profile.findOne();
    if (!profile) return res.json([]);
    res.json(profile.skills.slice(0, 5));
});

// Generic search
router.get('/search', async (req, res) => {
    const q = req.query.q.toLowerCase();
    const profile = await Profile.findOne();
    if (!profile) return res.json([]);
    const projects = profile.projects.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    const skills = profile.skills.filter(s => s.toLowerCase().includes(q));
    res.json({ projects, skills });
});

export default router;
