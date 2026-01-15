import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "../actions";

export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    if (!cookieStore.get("admin_session")) {
        redirect("/admin");
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <form action={logout}>
                    <button className="text-sm font-medium hover:underline text-destructive">
                        Logout
                    </button>
                </form>
            </div>
            {children}
        </div>
    );
}
