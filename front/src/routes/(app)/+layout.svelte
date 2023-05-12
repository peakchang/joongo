<script>
    // @ts-nocheck

    import "$src/app.css";
    import "$node_modules/@fortawesome/fontawesome-free/css/all.min.css";

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import SideBar from "$lib/components/SideBar.svelte";
    // import { auth_chk } from "$lib/lib";

    let url = "/";
    let sideBarStatus = false;
    $: url = $page.url.pathname;
    const navs = [
        // { title: "키즈폰", query: "kids" },
        { title: "분양인", href: "/" },
    ];

    $: {
        console.log($page.url.pathname);
        // auth_chk()
    }

    let search_input;
    let shWrap = false;
</script>

<svelte:head>
    <!-- SUIT 폰트 CSS -->
</svelte:head>

<div class="max-w-2xl mx-auto h-screen">
    <header class="">
        <div
            class="top-fix-left w-full md:max-w-2xl mx-auto fixed top-0 flex py-3 px-5 justify-between items-center suit-font border-b border-zinc-100 bg-white z-20"
        >
            <div class="flex">
                <button
                    on:click={() => {
                        sideBarStatus = !sideBarStatus;
                    }}
                >
                    <i class="fa-solid fa-bars" />
                </button>

                <a href="/">
                    <div class="ml-5">LOGO</div>
                </a>
            </div>

            <div
                class="flex border border- border-gray-300 py-1 pl-3 rounded-lg overflow-hidden"
                class:border-2={shWrap}
            >
                <button><i class="fa-solid fa-magnifying-glass" /></button>

                <input
                    type="text"
                    on:focusout={() => {
                        shWrap = false;
                    }}
                    on:focusin={() => {
                        shWrap = true;
                    }}
                    class="b border-none focus:outline-none ml-2"
                />
            </div>
        </div>

        <SideBar bind:sideBarStatus {navs} />
    </header>

    <slot />
</div>

<style>
    .top-fix-left {
        left: calc(50% - 336px) !important;
    }
    @media (max-width: 672px) {
        .top-fix-left {
            left: 0 !important;
        }
    }
    :global(.suit-font) {
        font-family: "SUIT";
    }

    :global(.max_screen_mobile) {
        max-width: 970px;
    }

    :global(.main_img) {
        height: 300px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 970px;
        margin: 0 auto;
    }

    :global(.main_img h1) {
        text-align: center;
        font-size: 40px;
        font-weight: bolder;
        position: relative;
    }
</style>
