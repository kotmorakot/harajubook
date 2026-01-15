import { login } from "./actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
    const cookieStore = await cookies();
    if (cookieStore.get("admin_session")) {
        redirect("/admin/dashboard");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Admin Access</h1>
                <p className="text-sm text-muted-foreground">Enter password to manage content.</p>
            </div>
            <form action={login} className="w-full max-w-sm space-y-4">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
