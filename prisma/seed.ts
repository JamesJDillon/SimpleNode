import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedUsers() {
  console.log('\nā Seeding the user accounst.');
  const adminEncryptedPass = await bcrypt.hash('admin', 10);
  const userEncryptedPass = await bcrypt.hash('user', 10);

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userEncryptedPass,
      role: 'USER',
    },
  });


  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminEncryptedPass,
      role: 'ADMIN',
    },
  });

  console.log('ā Accounts seeded.');
}

async function main() {
  await seedUsers();

  console.log('\nš Database seeded. š');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
