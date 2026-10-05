import {
  Activity,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckSquare,
  FolderKanban,
  ListChecks,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

export const features = [
  {
    icon: ListChecks,
    title: 'Create & Assign Tasks',
    description: 'Turn project goals into clear tasks and make ownership easy for everyone to understand.',
    tone: 'bg-blue',
  },
  {
    icon: Activity,
    title: 'Track Task Progress',
    description: 'See what is pending, in progress, and complete without chasing status updates.',
    tone: 'bg-purple',
  },
  {
    icon: UsersRound,
    title: 'Team Collaboration',
    description: 'Keep projects and responsibilities visible so your team can work together smoothly.',
    tone: 'bg-teal',
  },
  {
    icon: CalendarDays,
    title: 'Deadlines & Priorities',
    description: 'Organize important work by due date and priority to keep plans on track.',
    tone: 'bg-amber',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Keep an eye on your workspace and stay aware of the work that needs attention.',
    tone: 'bg-rose',
  },
  {
    icon: BarChart3,
    title: 'Task Status Reports',
    description: 'Get a clear overview of team workload and project progress in one place.',
    tone: 'bg-indigo',
  },
];

export const steps = [
  { icon: FolderKanban, title: 'Create a Project', description: 'Start with a shared space for your team’s goal and plan.' },
  { icon: UsersRound, title: 'Add Team Members', description: 'Bring the right people into the work and give everyone context.' },
  { icon: ListChecks, title: 'Assign Tasks', description: 'Break the project into clear tasks with owners and priorities.' },
  { icon: Activity, title: 'Track Progress', description: 'Update task statuses and see how the work is moving.' },
  { icon: CheckSquare, title: 'Complete Tasks', description: 'Close out the work and celebrate what the team accomplished.' },
];

export const benefits = [
  {
    icon: Check,
    title: 'Easy to use',
    description: 'A straightforward workspace that helps your team get organized quickly.',
  },
  {
    icon: ShieldCheck,
    title: 'Centralized task management',
    description: 'Keep project details, assigned work, and task status together.',
  },
  {
    icon: Activity,
    title: 'Real-time progress tracking',
    description: 'See task status changes as your team updates its work.',
  },
  {
    icon: BarChart3,
    title: 'Better team productivity',
    description: 'Make responsibilities clear and spend less time searching for updates.',
  },
];
