<script lang="ts">
    import { enhance } from "$app/forms";
    import qrCode from "$lib/assets/qr_code.png";

    let { form } = $props();
    let isSubmitting = $state(false);

    const handleEnhance = () => {
        isSubmitting = true;

        return async ({ update }: { update: () => Promise<void> }) => {
            try {
                await update();
            } finally {
                isSubmitting = false;
            }
        };
    };
</script>

<svelte:head>
    <title>MicroXof</title>
</svelte:head>

<main class="p-8 items-center">

    <img class="w-10/12 md:w-3/12 mb-8 place-self-center" src={qrCode} alt="QR Code">
    <p class="text-gray-700 text-center md:text-xl">Scan the QR code above to pay the <span class="font-bold">50.00 PHP</span> membership fee.</p>

    <div class="flex flex-col md:flex-row justify-center my-16 gap-y-4 md:gap-x-8">
        <article class="bg-neutral-100 border-4 border-blue-500 rounded-2xl p-8 w-full md:w-5/12">
            <p class="text-xl font-bold text-center text-blue-500">How to join BulSU Microsoft Student Community</p>
            <div class="place-self-center mt-8">
                <p class="text-gray-700">
                    1. Scan the QR code above and pay the <span class="font-bold">50.00 PHP</span> membership fee.<br>
                    2. Save the reference number of your payment.<br>
                    3. Fill out the form below and submit it.<br>
                    4. Wait for the confirmation of your membership application through email.
                </p>
            </div>
        </article>
        <article class="bg-neutral-100 border-4 border-blue-500 rounded-2xl p-8 w-full md:w-5/12">
            <p class="text-xl font-bold text-center text-blue-500">Member's Benefits</p>
            <div class="place-self-center mt-8">
                <p class="text-gray-700">
                    1. <span class="font-bold">Workshops & Seminars</span> - Join hands-on events that sharpen your skills and prep you for the real world.<br>
                    2. <span class="font-bold">Leadership & Growth</span> - Step up, speak out, or simply grow—we've got the space and support for it.<br>
                    3. <span class="font-bold">Career & Connections</span> - Meet mentors, alumni, and industry pros who can open doors for your future.<br>
                    4. <span class="font-bold">Perks & Resources</span> - Get access to tools, materials, and exclusive perks just for being with MSC.<br>
                    5. <span class="font-bold">Belonging & Community</span> - Connect with students across all courses. There's a place for you here.
                </p>
            </div>
        </article>
    </div>

    <form class="w-11/12 place-self-center" method="post" action="?/submit" use:enhance={handleEnhance}>

        <ul class="grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-x-2 gap-y-2 *:flex *:flex-col *:gap-y-2">

            <li class="md:col-span-3">
                <label for="first_name">First Name <span class="text-red-500">*</span></label>
                <input type="text" id="first_name" name="first_name" placeholder="Xoft" required>
            </li>
            <li class="md:col-span-3">
                <label for="middle_name">Middle Name</label>
                <input type="text" id="middle_name" name="middle_name">
            </li>
            <li class="md:col-span-3">
                <label for="last_name">Last Name <span class="text-red-500">*</span></label>
                <input type="text" id="last_name" name="last_name" placeholder="Dela Cruz" required>
            </li>
            <li class="md:col-span-3">
                <label for="suffix">Suffix</label>
                <select name="suffix" id="suffix">
                    <option value="">None</option>
                    <option value="jr">Jr.</option>
                    <option value="sr">Sr.</option>
                    <option value="ii">II</option>
                    <option value="iii">III</option>
                    <option value="iv">IV</option>
                    <option value="v">V</option>
                </select>
            </li>


            <li class="md:col-span-4">
                <label for="email">Email <span class="text-red-500">*</span></label>
                <input type="text" id="email" name="email" placeholder="xoftdelacruz@outlook.com" required>
            </li>
            <li class="md:col-span-4">
                <label for="birthdate">Birthdate <span class="text-red-500">*</span></label>
                <input class="w-full" type="date" id="birthdate" name="birthdate" required>
            </li>
            <li class="md:col-span-4">
                <label for="gender">Gender <span class="text-red-500">*</span></label>
                <select id="gender" name="gender" required>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="other">Prefer not to say/Other</option>
                </select>

            </li>
            <li class="md:col-span-4">
                <label for="student_number">Student Number <span class="text-red-500">*</span></label>
                <input type="text" id="student_number" name="student_number" placeholder="2026000001" required>
            </li>
            <li class="md:col-span-4">
                <label for="year_level">Year Level <span class="text-red-500">*</span></label>
                <select id="year_level" name="year_level" required>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                </select>
            </li>
            <li class="md:col-span-4">
                <label for="college">College <span class="text-red-500">*</span></label>
                <select name="college" id="college" required>
                    <option value="CAFA">CAFA</option>
                    <option value="CAL">CAL</option>
                    <option value="CBEA">CBEA</option>
                    <option value="CCJE">CCJE</option>
                    <option value="CHTM">CHTM</option>
                    <option value="CICT" selected>CICT</option>
                    <option value="CIT">CIT</option>
                    <option value="CLaw">CLaw</option>
                    <option value="CN">CN</option>
                    <option value="COE">COE</option>
                    <option value="CPTEd">CPTEd</option>
                    <option value="CS">CS</option>
                    <option value="CSER">CSER</option>
                    <option value="CSSP">CSSP</option>
                    <option value="GS">GS</option>
                </select>
            </li>
            
            <li class="md:col-span-6">
                <label for="program">Program <span class="text-red-500">*</span></label>
                <input type="text" id="program" name="program" placeholder="BS Information Technology" required>
            </li>
            <li class="md:col-span-6">
                <label for="section">Section <span class="text-red-500">*</span></label>
                <input type="text" id="section" name="section" placeholder="BSIT 1D-G2" required>
            </li>

            <li class="md:col-span-6">
                <label for="contact_number">Contact Number <span class="text-red-500">*</span></label>
                <input type="text" id="contact_number" name="contact_number" placeholder="09000000000" required>
            </li>
            <li class="md:col-span-6">
                <label for="address">Address <span class="text-red-500">*</span></label>
                <input type="text" id="address" name="address" placeholder="Block 20 Lot 21, MSC Street, Brgy. Xoft, Malolos City, Bulacan" required>
            </li>

            <li class="md:col-span-12">
                <label for="reference_number">Reference Number <span class="text-red-500">*</span></label>
                <p class="text-sm text-gray-500">Enter your GCash reference number. Membership application will be terminated if the reference number is invalid.</p>
                <input type="text" id="reference_number" name="reference_number" required>
            </li>

        </ul>

        <button
            class={`py-3 px-2 text-white font-bold w-full mt-8 duration-200 ${
                isSubmitting
                    ? "bg-slate-500 cursor-not-allowed"
                    : form?.success === true
                        ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                        : form?.success === false
                            ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
            type="submit"
            disabled={isSubmitting}
        >
            {#if isSubmitting}
                Submitting...
            {:else if form?.success === true || form?.success === false}
                {form.message}
            {:else}
                Register
            {/if}
        </button>

    </form>

</main>