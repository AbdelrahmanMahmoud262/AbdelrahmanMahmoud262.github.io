import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, budget, timeline, description, honeypot } = body;

    // 1. Honeypot check for basic anti-spam protection
    if (honeypot && honeypot.trim() !== "") {
      console.warn("Honeypot filled, blocking request as spam.");
      return NextResponse.json({ success: true, message: "Mock success" });
    }

    // 2. Simple server-side validation
    if (!name || !email || !budget || !timeline || !description) {
      return NextResponse.json(
        { error: "Missing required parameters." },
        { status: 400 }
      );
    }

    // 3. Check if Resend API key is configured
    if (!resendApiKey) {
      // If API key is missing, mock successful dispatch in local development mode
      console.log("RESEND_API_KEY environment variable is not configured. Mocking email delivery.");
      console.log("Email Details:", { name, email, company, budget, timeline, description });
      
      // Delay to simulate network activity
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return NextResponse.json({
        success: true,
        message: "Demo mode: Email printed to local development logs successfully.",
      });
    }

    // 4. Initialize Resend and dispatch email
    const resend = new Resend(resendApiKey);
    
    // We send the notification to the user's primary email address
    const { data, error } = await resend.emails.send({
      from: "Portfolio Lead <onboarding@resend.dev>", // Resend default verified sender
      to: "abdelrahmanmahmoudnasr@gmail.com",
      subject: `New Freelance/Consulting Inquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not Specified"}</p>
        <p><strong>Budget Range:</strong> ${budget}</p>
        <p><strong>Project Timeline:</strong> ${timeline}</p>
        <p><strong>Details:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f3f4f6; padding: 12px; border-radius: 4px;">${description}</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error occurred.";
    console.error("Contact API Handler Error:", error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
