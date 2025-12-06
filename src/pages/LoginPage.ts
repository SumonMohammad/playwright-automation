import { expect, Locator, Page } from '@playwright/test';


export class LoginPage{
    readonly page:Page;
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly userNameErrorMessage: Locator;
    readonly passwordErrorMessage: Locator;

    constructor(page:Page){
        this.page=page;
        this.usernameInput=page.locator('#username');
        this.passwordInput=page.locator('#password');
        this.loginButton=page.locator('#submit'); 
        this.userNameErrorMessage=page.locator('#error');
        this.passwordErrorMessage=page.locator('#error');
        
    }

    async goToUrl():Promise<void>{
        await this.page.goto(process.env.TEST_LOGIN_URL as string);
        await this.page.waitForLoadState('networkidle');
    }

   async urlValidation(path: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(path));
   }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await Promise.all([
        this.page.waitForURL(/logged-in-successfully/),
        this.loginButton.click()
    ]);
}


}