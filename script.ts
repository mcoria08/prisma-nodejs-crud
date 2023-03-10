import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ["query"] })

async function main(){
    
  //Delete all users
  await prisma.user.deleteMany();  

  
  //create an user
  const users = await prisma.user.createMany({ 
    data: [{
        name: "Miguel",
        email: "abcdef@gmail.com",
        age: 48,           
      },{
        name: "Ángel",
        email: "abcdef@hotmail.com",
        age: 48,           
      },{
        name: "Ángel",
        email: "xyz@hotmail.com",
        age: 2,           
      },{
        name: "Ángel",
        email: "test@hotmail.com",
        age: 15,           
      }]
  });


  //get all users 
  const getAllUsers = await prisma.user.findMany();
  console.log(getAllUsers);


  //Find an user
  const getOneUser = await prisma.user.findUnique({
    where: {
      email: "abcdef@gmail.com",
    }
  });
  console.log(getOneUser);


  //Find an user by AGE-NAME
  //Ver @@unique([age, name]) en el schema
  const getOneUserByAgeName = await prisma.user.findUnique({
    where: {
      age_name: {
        age: 48,
        name: 'Miguel'
      }
    }
  });
  console.log(getOneUserByAgeName);


  //Find Many   
  const getMany = await prisma.user.findMany({
    where: {
       name: 'Ángel'
    },
    orderBy: {
      age: "asc"
    },
    take: 2,
    skip: 1,
  });
  console.log(getMany);


  //Find Many NOT MIGUEL & Axel and grater than 15
  const getNotMiguel = await prisma.user.findMany({
    where: {
       name: { notIn: ['Miguel', 'Axel'] },
       age: { gt: 15}
    },
  });
  console.log(getNotMiguel);


  //AND
  const getWithANDOerator = await prisma.user.findMany({
    where: {
      AND: [
       { email: { startsWith: 'abc' }},
       { age: { gt: 15} },
       { name: 'Ángel' }
      ]
    },
  });
  console.log(getWithANDOerator);


  //UPDATE #1
  const getUpdated = await prisma.user.update({
    where: {         
      email: "abcdef@hotmail.com"     
    },
    data: {
      email: "testing@hotmail.com"
    }
  });
  console.log(getUpdated);


  //UPDATE #2
  const getUpdated2 = await prisma.user.update({
    where: {         
      email: "testing@hotmail.com"     
    },
    data: {
      age: {
        decrement: 8
      }
    }
  });
  console.log(getUpdated2);

  //delete all users
  //await prisma.user.deleteMany()
}

main()
  .catch(e => {
    console.error(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })