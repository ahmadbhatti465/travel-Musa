import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllPayments, updatePaymentStatus, deletePayment } from "@/lib/admin-data";

export async function GET() {
  try {
    await requireAdmin();
    const payments = getAllPayments();
    return NextResponse.json({ payments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const data = await request.json();
    updatePaymentStatus(data.id, data.status);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update payment" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    deletePayment(Number(id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete payment" }, { status: 500 });
  }
}
