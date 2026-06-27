<script lang="ts">
	import { resolve } from "$app/paths";
    import microxofLogo from "$lib/assets/microxof.svg";
</script>

<header class="flex px-8 py-4 items-center justify-center">
    <a class="flex gap-x-1 items-center text-blue-500 hover:text-blue-600 duration-300 text-2xl font-bold" href={resolve("/")}>
        <img src={microxofLogo} alt="MicroXof Logo" class="h-10 w-auto" />
        <p>MicroXof Online Registration Form</p>
    </a>
</header>