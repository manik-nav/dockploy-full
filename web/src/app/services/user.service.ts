import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly users = signal<User[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '(555) 234-5678',
      address: { street: '142 Maple Avenue', city: 'Portland', state: 'OR', zip: '97201' },
      bio: 'Sarah is a senior software engineer with over 10 years of experience building scalable web applications. She is passionate about clean code, mentoring junior developers, and contributing to open-source projects. In her free time, she enjoys hiking in the Pacific Northwest and experimenting with sourdough recipes.',
      imageUrl: 'https://i.pravatar.cc/300?img=1',
    },
    {
      id: 2,
      name: 'Marcus Chen',
      email: 'marcus.chen@example.com',
      phone: '(555) 345-6789',
      address: { street: '88 Oak Street', city: 'San Francisco', state: 'CA', zip: '94102' },
      bio: 'Marcus is a product designer who bridges the gap between engineering and user experience. With a background in cognitive psychology, he brings a research-driven approach to every project. He has led design systems at two Fortune 500 companies and regularly speaks at design conferences.',
      imageUrl: 'https://i.pravatar.cc/300?img=3',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      phone: '(555) 456-7890',
      address: { street: '305 Birch Lane', city: 'Austin', state: 'TX', zip: '73301' },
      bio: 'Emily is a data scientist specializing in natural language processing and machine learning. She holds a PhD from MIT and has published numerous papers on transformer architectures. When not training models, she volunteers at local coding bootcamps to help underrepresented groups enter tech.',
      imageUrl: 'https://i.pravatar.cc/300?img=5',
    },
    {
      id: 4,
      name: 'James Williams',
      email: 'james.williams@example.com',
      phone: '(555) 567-8901',
      address: { street: '720 Cedar Drive', city: 'Denver', state: 'CO', zip: '80201' },
      bio: 'James is a DevOps engineer who thrives on automating infrastructure and streamlining CI/CD pipelines. He has migrated dozens of legacy systems to cloud-native architectures. An avid rock climber and amateur photographer, he finds parallels between scaling mountains and scaling systems.',
      imageUrl: 'https://i.pravatar.cc/300?img=7',
    },
    {
      id: 5,
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '(555) 678-9012',
      address: { street: '56 Elm Court', city: 'Chicago', state: 'IL', zip: '60601' },
      bio: 'Priya is a full-stack developer and tech lead who specializes in building fintech platforms. She has a talent for breaking down complex financial regulations into elegant technical solutions. Outside of work, she runs a popular tech blog and mentors women in STEM.',
      imageUrl: 'https://i.pravatar.cc/300?img=9',
    },
    {
      id: 6,
      name: 'Daniel Kim',
      email: 'daniel.kim@example.com',
      phone: '(555) 789-0123',
      address: { street: '199 Walnut Boulevard', city: 'Seattle', state: 'WA', zip: '98101' },
      bio: 'Daniel is a mobile app developer with expertise in both iOS and Android platforms. He has shipped apps with millions of downloads and is known for his obsession with smooth animations and pixel-perfect UI. He also teaches mobile development courses online and has a growing YouTube channel.',
      imageUrl: 'https://i.pravatar.cc/300?img=11',
    },
    {
      id: 7,
      name: 'Olivia Thompson',
      email: 'olivia.thompson@example.com',
      phone: '(555) 890-1234',
      address: { street: '411 Pine Street', city: 'Boston', state: 'MA', zip: '02101' },
      bio: 'Olivia is a cybersecurity analyst who helps organizations identify vulnerabilities and build robust defense systems. With certifications in CISSP and CEH, she brings deep expertise to threat modeling and incident response. She is also an advocate for privacy rights and digital ethics.',
      imageUrl: 'https://i.pravatar.cc/300?img=16',
    },
    {
      id: 8,
      name: 'Alexander Wright',
      email: 'alexander.wright@example.com',
      phone: '(555) 901-2345',
      address: { street: '633 Spruce Way', city: 'New York', state: 'NY', zip: '10001' },
      bio: 'Alexander is a solutions architect who designs enterprise-scale distributed systems. He has over 15 years of experience working with Fortune 100 companies on their digital transformation journeys. A published author and keynote speaker, he is passionate about making complex technology accessible to everyone.',
      imageUrl: 'https://i.pravatar.cc/300?img=12',
    },
  ]);

  getUsers(): User[] {
    return this.users();
  }

  getUserById(id: number): User | undefined {
    return this.users().find(user => user.id === id);
  }
}
