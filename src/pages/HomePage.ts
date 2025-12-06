import { expect, Locator, Page } from '@playwright/test';


export class HomePage{
    readonly page:Page;
    readonly postTitle: Locator;
    readonly logOutButtton: Locator;
    

    constructor(page:Page){
        this.page=page;
        this.postTitle=page.getByText('Logged In Successfully', { exact: true });
        this.logOutButtton=page.getByRole('link', { name: 'Log out' });
    }

    async logout():Promise<void>{
        await this.logOutButtton.click();
    }
   

}