import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default async function ResetPasswordPage({ searchParams }) {
  const value = (await searchParams).token;
  const token = typeof value === "string" ? value : "";
  return <ResetPasswordForm token={token} />;
}
