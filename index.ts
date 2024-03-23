import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";

const DEFAULT_ID = 123456;
const DEFAULT_PIN = 1234;
let bankBalance = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
const validate = (pin: number, id: number): boolean => {
  if (pin === DEFAULT_PIN && id === DEFAULT_ID) {
    return true;
  } else {
    return false;
  }
};

const spinner = (isCorrect: boolean) => {
  const mySpinner = createSpinner("Logging in...").start();

  if (isCorrect) {
    mySpinner.success({ text: "logged in successfully" });
  } else {
    mySpinner.error({ text: "invalid credentials" });
    process.exit(1);
  }
};

const nextActions = async () => {
  const action = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      choices: ["withdraw", "deposit", "balance", "exit"],
      message: "What would you like to do?",
    },
  ]);

  if (action.action === "balance") {
    console.log(
      `Your current balance is: ${bankBalance} \nPlease take your cash`
    );
    nextActions();
  } else if (action.action === "deposit") {
    const { deposit } = await inquirer.prompt([
      {
        name: "deposit",
        type: "number",
        message: "Enter amount to deposit: ",
      },
    ]);

    bankBalance += deposit;
    console.log(`Your new balance is: ${bankBalance}`);
    nextActions();
  } else if (action.action === "withdraw") {
    const { withdraw } = await inquirer.prompt([
      {
        name: "withdraw",
        type: "number",
        message: "Enter amount to deposit: ",
      },
    ]);
    bankBalance -= withdraw;
    console.log(`Your new balance is: ${bankBalance}`);
    nextActions();
  } else {
    console.log("Thank you for using our ATM");
    process.exit(0);
  }
};

const atm = async () => {
  console.log(
    gradient.pastel.multiline("welcome to ATM. Developed by @growwithtalha") +
      "\n"
  );
  console.log("use id: 123456 and pin: 1234 to login");
  const credientials = await inquirer.prompt([
    {
      type: "number",
      name: "id",
      message: "Enter your atm id: ",
    },
    {
      type: "number",
      name: "pin",
      message: "Enter your atm pin: ",
    },
  ]);

  const isValidated = validate(credientials.pin, credientials.id);

  if (isValidated) {
    spinner(true);
    nextActions();
  } else {
    spinner(false);
  }
};

atm();
