import { Appwrite, Models } from "appwrite";

if (!process.env.appwriteEndpoint || !process.env.appwriteProjectId) {
    throw new Error("Appwrite environment variables not properly set!");
}

const sdk = new Appwrite();
sdk
    .setEndpoint(process.env.appwriteEndpoint)
    .setProject(process.env.appwriteProjectId);

const appUrl = process.env.baseUrl;

export type Order = {
    status: string,
    userId: string,
    packId: string,
    paymentId: string,
    createdAt: number
} & Models.Document;

export const AppwriteService = {
    async logout(): Promise<boolean> {
        try {
            await sdk.account.deleteSession("current");
            return true;
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again later.");
            return false;
        }
    },

    async login(): Promise<void> {
        await sdk.account.createAnonymousSession();
    },

    async getAuthStatus(): Promise<boolean> {
        try {
            await sdk.account.get();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    async buyPack(packId: string): Promise<boolean> {
        try {
            const executionResponse: any = await sdk.functions.createExecution("createPayment", JSON.stringify({
                redirectSuccess: `${appUrl}/cart-success`,
                redirectFailed: `${appUrl}/cart-error`,
                packId
            }), false);

            if (executionResponse.status === 'completed') {
            } else {
                throw new Error(executionResponse.stdout + "," + executionResponse.err);
            }

            const url = JSON.parse(executionResponse.stdout).paymentUrl;
            window.location.replace(url);

            return true;
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again later.");
            return false;
        }
    },

    async getOrders(page = 1): Promise<Models.DocumentList<Order> | null> {
        try {
            const offset = (page - 1) * 10;
            const ordersResponse = await sdk.database.listDocuments<Order>("orders", undefined, 10, offset, undefined, undefined, ['createdAt'], ['DESC']);

            return ordersResponse;
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again later.");
            return null;
        }
    }
};