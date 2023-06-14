import * as bcrypt from 'bcrypt';
import { PrismaService } from '../src/prisma.service';

async function bootstrap() {
    const saltOrRounds = 10;
    const prisma = new PrismaService();

    const employees = await prisma.employee.findMany();

    //could use here a transaction for bulk update
    employees.forEach(async(employee) => {
        let password = employee.FirstName + employee.LastName + "!";
        password = await bcrypt.hash(password, saltOrRounds);
        await prisma.employee.update({where:{EmployeeId:employee.EmployeeId},data:{Password:password}})
    });
    
    const employee = {
        FirstName: "Haris",
        LastName: "Kulas",
        Title: "Manager",
        Address: "Hum",
        BirthDate: null,
        HireDate: null,
        City: "Sarajevo",
        Country: "BiH",
        PostalCode: "71000",
        Phone: "1-212-456-7890",
        Email: "haris.kulas@gmail.com",
        Password:"HarisKulas!"
    };

    employee.Password = await bcrypt.hash(employee.Password, saltOrRounds);  
    await prisma.employee.create({ data: employee });
    process.exit(0);
}

bootstrap();


