import { db } from "$lib/server/db";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import {
  type NewRegistration,
  type Suffix,
  type Gender,
  type YearLevel,
  type College,
  registrations as registrationsTable,
} from "$lib/server/db/schema";
import { dailyLimiter, minuteLimiter } from "$lib/server/ratelimit";

export const actions: Actions = {
  submit: async (event) => {
    const ip = event.getClientAddress() || "127.0.0.1";

    try {
      const dailyCheck = await dailyLimiter.limit(ip);
      if (!dailyCheck.success) {
        return fail(429, {
          success: false,
          message: "Access denied. This IP is blocked for 24 hours due to excessive form submissions.",
        });
      }

      const minuteCheck = await minuteLimiter.limit(ip);
      if (!minuteCheck.success) {
        return fail(429, {
          success: false,
          message: "Too many requests. Please wait a minute before trying again.",
        });
      }
    } catch (error) {
      console.error("Rate limiter error:", error);
    }

    const formData: FormData = await event.request.formData();
    const firstName = formData.get("first_name")?.toString() ?? "";
    const middleName = formData.get("middle_name")?.toString() ?? "";
    const lastName = formData.get("last_name")?.toString() ?? "";
    let suffix: string | null = formData.get("suffix")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const birthdate = formData.get("birthdate")?.toString() ?? "";
    const gender = formData.get("gender")?.toString() ?? "";
    const studentNumber = formData.get("student_number")?.toString() ?? "";
    const yearLevel = formData.get("year_level")?.toString() ?? "";
    const college = formData.get("college")?.toString() ?? "";
    const program = formData.get("program")?.toString() ?? "";
    const section = formData.get("section")?.toString() ?? "";
    const contactNumber = formData.get("contact_number")?.toString() ?? "";
    const address = formData.get("address")?.toString() ?? "";
    const referenceNumber = formData.get("reference_number")?.toString() ?? "";

    if (suffix === "") {
      suffix = null;
    }

    try {
      const newRegistration: NewRegistration = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        suffix: suffix as Suffix | null,
        email: email,
        birthdate: birthdate,
        gender: gender as Gender,
        studentNumber: studentNumber,
        yearLevel: yearLevel as YearLevel,
        college: college as College,
        program: program,
        section: section,
        contactNumber: contactNumber,
        address: address,
        referenceNumber: referenceNumber,
    };

      const insertedRows = await db.insert(registrationsTable).values(newRegistration).returning();

      console.log("=== DATABASE INSERTION ATTEMPT ===");
      console.log("Inserted rows returned from Postgres:", insertedRows);

      if (!insertedRows || insertedRows.length === 0) {
        return fail(500, {
          success: false,
          message: "Submission failed. Please try again.",
        });
      }

      return {
        success: true,
        message: "Submission successful!",
      };
    } catch (error: unknown) {
      console.error("CRITICAL DRIZZLE ERROR:", error);

      return fail(500, {
        success: false,
        message: "Submission failed. Please try again.",
      });
    }
  },
};