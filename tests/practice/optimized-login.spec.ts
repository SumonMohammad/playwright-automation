import { expect, test } from '../../src/fixture/TestFixture';

test("Successful login with valid credentials", async ({homePage, loginPage})=>{   
   await loginPage.goToUrl();
   await loginPage.login(`${process.env.USER_NAME}`, `${process.env.PASS_WORD}`);
   await loginPage.urlValidation('logged-in-successfully');
   await expect(homePage.postTitle).toBeVisible();
   await expect(homePage.postTitle).toHaveText('Logged In Successfully');
   await expect(homePage.logOutButtton).toBeVisible();
   await homePage.logout();
   await loginPage.urlValidation("practice-test-login");
   
})

test("Failed login attempt with wrong username", async ({loginPage})=>{   
   await loginPage.goToUrl();
   await loginPage.login(`${process.env.WRONG_USER_NAME}`, `${process.env.PASS_WORD}`);
   await expect(loginPage.userNameErrorMessage).toBeVisible();
   await expect(loginPage.userNameErrorMessage).toHaveText('Your username is invalid!');   
})

test("Failed login attempt with wrong password", async ({loginPage})=>{   
   await loginPage.goToUrl();
   await loginPage.login(`${process.env.USER_NAME}`, `${process.env.WRONG_PASS_WORD}`);
   await expect(loginPage.passwordErrorMessage).toBeVisible();
   await expect(loginPage.passwordErrorMessage).toHaveText('Your password is invalid!');   
})