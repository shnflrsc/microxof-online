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

export const actions: Actions = {
  submit: async (event) => {
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
          message: "Registration failed. Please try again.",
        });
      }

      return {
        success: true,
        message: "Registration successful!",
      };
    } catch (error: unknown) {
      console.error("CRITICAL DRIZZLE ERROR:", error);

      return fail(500, {
        success: false,
        message: "Registration failed. Please try again.",
      });
    }
  },
};