// /* eslint-disable no-console */
// /* eslint-disable no-await-in-loop */
// /* eslint-disable no-plusplus */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedAdmin() {
  console.log('\n⌛ Seeding the admin account.');
  const encryptedPass = await bcrypt.hash('admin', 10);

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: encryptedPass,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin account seeded.');
}

async function main() {
  // Seed the admin account.
  await seedAdmin();

  console.log('\n🙌🏆🥇🎯💯🔑🗝️👏😤🤑 Database seeded. 🙌🏆🥇🎯💯🔑🗝️👏😤🤑.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
