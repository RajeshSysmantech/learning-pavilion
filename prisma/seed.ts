import { PrismaClient, CouponType, PlanInterval, UserRole, UserStatus, SubscriptionStatus } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMasters() {
  await prisma.roleMaster.createMany({
    data: [
      { code: UserRole.STUDENT, label: "Student" },
      { code: UserRole.PARENT, label: "Parent" },
      { code: UserRole.ADMIN, label: "Admin" },
      { code: UserRole.SUPER_ADMIN, label: "Super Admin" }
    ],
    skipDuplicates: true
  });

  for (const subject of [
    { name: "Maths", slug: "maths" },
    { name: "Science", slug: "science" },
    { name: "English", slug: "english" },
    { name: "GK", slug: "gk" }
  ]) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: subject,
      create: subject
    });
  }

  for (const level of [
    { name: "Easy", slug: "easy", sortOrder: 1 },
    { name: "Medium", slug: "medium", sortOrder: 2 },
    { name: "Hard", slug: "hard", sortOrder: 3 }
  ]) {
    await prisma.difficultyLevel.upsert({
      where: { slug: level.slug },
      update: level,
      create: level
    });
  }

  for (const badge of [
    { title: "First Quiz Champion", slug: "first-quiz-champion", ruleType: "QUIZ_COUNT", ruleConfig: { count: 1 } },
    { title: "5-Day Streak", slug: "5-day-streak", ruleType: "STREAK_DAYS", ruleConfig: { days: 5 } },
    { title: "10 Quizzes Completed", slug: "10-quizzes-completed", ruleType: "QUIZ_COUNT", ruleConfig: { count: 10 } },
    { title: "Typing Accuracy Ace", slug: "typing-accuracy-ace", ruleType: "TYPING_ACCURACY", ruleConfig: { accuracy: 95 } },
    { title: "First Reward Redeemed", slug: "first-reward-redeemed", ruleType: "REWARD_REDEMPTION_COUNT", ruleConfig: { count: 1 } }
  ]) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: badge,
      create: badge
    });
  }

  for (const plan of [
    { name: "Free", slug: "free", interval: PlanInterval.FREE, priceAmount: 0, featureConfig: { modules: ["quiz", "typing"] } },
    { name: "Monthly", slug: "monthly", interval: PlanInterval.MONTHLY, priceAmount: 299, featureConfig: { modules: ["all"], rewards: "premium" } },
    { name: "Yearly", slug: "yearly", interval: PlanInterval.YEARLY, priceAmount: 2999, featureConfig: { modules: ["all"], reports: true } },
    { name: "Special Offer", slug: "special-offer", interval: PlanInterval.SPECIAL, priceAmount: 1999, featureConfig: { offer: "Free 1 Year with HP Laptop" } }
  ]) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan
    });
  }

  for (const setting of [
    { key: "allowLoginOnlyStreak", value: false },
    { key: "defaultLanguage", value: "English" },
    { key: "dailyChallengeCoinBonus", value: 120 },
    { key: "rewardApprovalRequired", value: true }
  ]) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value }
    });
  }

  for (const reward of [
    { title: "Astronaut Pencil Kit", slug: "astronaut-pencil-kit", coinCost: 450, stock: 15, description: "A fun stationery set for curious learners." },
    { title: "Science Explorer Badge Pack", slug: "science-explorer-badge-pack", coinCost: 300, stock: 26, description: "Printable and collectible badge pack." },
    { title: "Premium Puzzle Bundle", slug: "premium-puzzle-bundle", coinCost: 1000, stock: 10, description: "Unlock premium puzzle experiences.", requiresApproval: false }
  ]) {
    await prisma.reward.upsert({
      where: { slug: reward.slug },
      update: reward,
      create: reward
    });
  }

  await prisma.couponCode.upsert({
    where: { code: "WELCOME25" },
    update: {},
    create: { code: "WELCOME25", type: CouponType.PERCENTAGE, value: 25, isActive: true }
  });
}

async function seedContent() {
  const maths = await prisma.subject.findUniqueOrThrow({ where: { slug: "maths" } });
  const science = await prisma.subject.findUniqueOrThrow({ where: { slug: "science" } });
  const easy = await prisma.difficultyLevel.findUniqueOrThrow({ where: { slug: "easy" } });
  const medium = await prisma.difficultyLevel.findUniqueOrThrow({ where: { slug: "medium" } });

  const fractions = await prisma.category.upsert({
    where: { subjectId_slug: { subjectId: maths.id, slug: "fractions" } },
    update: { name: "Fractions" },
    create: { subjectId: maths.id, name: "Fractions", slug: "fractions" }
  });

  const space = await prisma.category.upsert({
    where: { subjectId_slug: { subjectId: science.id, slug: "space" } },
    update: { name: "Space" },
    create: { subjectId: science.id, name: "Space", slug: "space" }
  });

  const quizOne = await prisma.quizSet.upsert({
    where: { slug: "math-magic-fractions" },
    update: {},
    create: {
      title: "Math Magic - Fractions",
      slug: "math-magic-fractions",
      subjectId: maths.id,
      categoryId: fractions.id,
      difficultyLevelId: easy.id,
      isPublished: true,
      coinReward: 50,
      xpReward: 75,
      timeLimitSeconds: 300
    }
  });

  await prisma.quizSet.upsert({
    where: { slug: "space-science-sprint" },
    update: {},
    create: {
      title: "Space Science Sprint",
      slug: "space-science-sprint",
      subjectId: science.id,
      categoryId: space.id,
      difficultyLevelId: medium.id,
      isPublished: true,
      coinReward: 70,
      xpReward: 100,
      timeLimitSeconds: 420
    }
  });

  await prisma.quizQuestion.upsert({
    where: { id: BigInt(1) },
    update: {},
    create: {
      quizSetId: quizOne.id,
      prompt: "Which fraction is equivalent to 1/2?",
      explanation: "2/4 simplifies to 1/2.",
      sortOrder: 1
    }
  });

  await prisma.quizQuestion.upsert({
    where: { id: BigInt(2) },
    update: {},
    create: {
      quizSetId: quizOne.id,
      prompt: "Which fraction is larger than 1/3?",
      explanation: "1/2 is larger than 1/3.",
      sortOrder: 2
    }
  });

  const questions = await prisma.quizQuestion.findMany({
    where: { quizSetId: quizOne.id },
    orderBy: { sortOrder: "asc" }
  });

  const optionMaps = [
    [
      ["2/4", true],
      ["3/4", false],
      ["4/10", false],
      ["5/12", false]
    ],
    [
      ["1/5", false],
      ["1/2", true],
      ["1/4", false],
      ["1/6", false]
    ]
  ] as const;

  for (const [questionIndex, question] of questions.entries()) {
    for (const [optionIndex, [text, isCorrect]] of optionMaps[questionIndex].entries()) {
      await prisma.quizQuestionOption.upsert({
        where: { id: BigInt(questionIndex * 10 + optionIndex + 1) },
        update: {},
        create: {
          questionId: question.id,
          text,
          isCorrect,
          sortOrder: optionIndex + 1
        }
      });
    }
  }

  for (const lesson of [
    {
      title: "Home Row Heroes",
      slug: "home-row-heroes",
      bodyText: "Practice makes progress. Every day you type, your fingers learn where to go faster and more accurately.",
      targetWpm: 20,
      targetAccuracy: 90,
      coinReward: 40,
      xpReward: 60,
      difficultyLevelId: easy.id
    },
    {
      title: "Accuracy Quest",
      slug: "accuracy-quest",
      bodyText: "Careful typing builds confidence. Focus on each word, keep a steady rhythm, and let your accuracy rise.",
      targetWpm: 28,
      targetAccuracy: 95,
      coinReward: 55,
      xpReward: 80,
      difficultyLevelId: medium.id
    }
  ]) {
    await prisma.typingLesson.upsert({
      where: { slug: lesson.slug },
      update: lesson,
      create: { ...lesson, isPublished: true }
    });
  }
}

async function seedUsers() {
  const freePlan = await prisma.plan.findUniqueOrThrow({ where: { slug: "free" } });

  const student = await prisma.user.upsert({
    where: { email: "student@learningpavilion.app" },
    update: {},
    create: {
      email: "student@learningpavilion.app",
      passwordHash: hashSync("Student@123", 10),
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
      fullName: "Aarohi Sharma",
      displayName: "Aaru",
      studentProfile: {
        create: {
          age: 10,
          grade: "5",
          language: "English",
          onboardingDone: true,
          totalCoins: 1240,
          totalXp: 8420,
          currentLevel: 12,
          currentStreak: 7,
          bestStreak: 12,
          interests: ["Maths", "Science", "Puzzles"]
        }
      }
    },
    include: { studentProfile: true }
  });

  const parent = await prisma.user.upsert({
    where: { email: "parent@learningpavilion.app" },
    update: {},
    create: {
      email: "parent@learningpavilion.app",
      passwordHash: hashSync("Parent@123", 10),
      role: UserRole.PARENT,
      status: UserStatus.ACTIVE,
      fullName: "Riya Sharma",
      parentProfile: { create: { relationshipLabel: "Mother" } }
    },
    include: { parentProfile: true }
  });

  await prisma.user.upsert({
    where: { email: "admin@learningpavilion.app" },
    update: {},
    create: {
      email: "admin@learningpavilion.app",
      passwordHash: hashSync("Admin@123", 10),
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      fullName: "Platform Admin"
    }
  });

  if (student.studentProfile && parent.parentProfile) {
    await prisma.parentStudentMap.upsert({
      where: {
        parentId_studentId: {
          parentId: parent.parentProfile.id,
          studentId: student.studentProfile.id
        }
      },
      update: {},
      create: {
        parentId: parent.parentProfile.id,
        studentId: student.studentProfile.id
      }
    });
  }

  await prisma.subscription.upsert({
    where: { id: BigInt(1) },
    update: {},
    create: {
      userId: student.id,
      planId: freePlan.id,
      provider: "internal",
      status: SubscriptionStatus.ACTIVE,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  });
}

async function main() {
  await seedMasters();
  await seedContent();
  await seedUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
