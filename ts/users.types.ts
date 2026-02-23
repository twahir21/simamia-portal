export type UserStatus = "Active" | "Inactive";
export type UserVerification = "Pending" | "Verified";

export type UserShop = {
    id: string;
    shopName: string;
    phoneNumber: string;
    email: string;
    status: UserStatus;
    verified: UserVerification;
    createdAt: Date;
    endsAt: { _seconds: number, _nanoseconds: number };
}