#! /usr/bin/env node

// ATM

import inquirer from "inquirer";
import chalk from "chalk";



console.log(chalk.rgb(138, 86, 151)(`
 █████  ████████ ███    ███ 
██   ██    ██    ████  ████ 
███████    ██    ██ ████ ██ 
██   ██    ██    ██  ██  ██ 
██   ██    ██    ██      ██ 

   \n\n`
));


interface answerType {
    userId: string,
    userPin: string,
    accountType: string,
    transactionType: string,
    amount: number,
}

const answer: answerType = await inquirer.prompt([
    {
        type: "input",
        name: "userId",
        message: chalk.bgWhite.blackBright("Enter User ID:")
    },
    {
        type: "password",
        mask: "*",
        name: "userPin",
        message: chalk.bgWhite.blackBright("Enter you PIN:")
    },
    {
        type: "list",
        name: "accountType",
        choices: ['Saving', 'Current'],
        message: "Select your account type:"
    },
    {
        type: "rawlist",
        name: "transactionType",
        choices: ["FastCash", "Withdraw"],
        message: "Select your transaction type:",
        when(answer){
            return answer.accountType;
        }
    },
    {
        type: "list",
        name: "amount",
        choices: [1000, 5000, 10000, 20000],
        message: "Select your amount:",
        when(answer){
            return answer.transactionType == 'FastCash';
        }
    },
    {
        type: "number",
        name: "amount",
        message: "Enter your amount:",
        when(answer){
            return answer.transactionType == 'Withdraw';
        }
    },

]);

if (answer.userId === "Abbas" && answer.userPin === '123') {

    const balance = Math.floor(Math.random()*100000);
    console.log(chalk.green(`\nYour current balance ${balance}\n`));
    const enteredAmount = answer.amount;
    if (balance >= enteredAmount) {
        const remaining = balance - enteredAmount;
        console.log(chalk.yellow(`Your remaining balance is: ${remaining}\n`));
        console.log(chalk.blueBright(`\n**** Transaction Slip ****\n`),answer);
    } else {
        console.log(chalk.redBright("Sorry, You have insufficient balance\n"));
    }
    
} else {
    console.log(chalk.redBright("Sorry invalid userId or Pin"));
    
}


