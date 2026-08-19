import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  const school = await prisma.school.upsert({
    where: { name: 'Demo Sekolah' },
    update: {},
    create: {
      name: 'Demo Sekolah',
      address: 'Jalan Contoh 1',
      city: 'Jakarta',
      district: 'Gambir',
      province: 'DKI Jakarta',
      postalCode: '10110',
    },
  });

  const hashed = await argon2.hash('password123');

  const user = await prisma.user.upsert({
    where: { email: 'admin@sekolah.local' },
    update: {},
    create: {
      email: 'admin@sekolah.local',
      username: 'admin',
      password: hashed,
      firstName: 'Admin',
      lastName: 'Sekolah',
      schoolId: school.id,
      isEmailVerified: true,
    },
  });

  console.log({ school: school.id, user: user.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
