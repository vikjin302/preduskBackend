import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String]
});

const workSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String
});

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  skills: [String],
  projects: [projectSchema],
  work: [workSchema],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
});

export default mongoose.model('Profile', profileSchema);

