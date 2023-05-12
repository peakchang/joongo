<script>
// @ts-nocheck

    import { goto } from "$app/navigation";
    export let sideBarStatus = false;
    export let navs;

    const close_sidebar = (ele) => {
        ele.addEventListener("click", (e) => {
            sideBarStatus = !sideBarStatus;
            e.stopPropagation();
        });
    };
</script>

<div>
    <div class="set_rect suit-font" class:open_rect={sideBarStatus}>
        <div class="pt-3 text-right sidebar-header">
            <button
                class="text-3xl font-thin"
                on:click={() => {
                    sideBarStatus = !sideBarStatus;
                }}
            >
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTkgNy44NjlMMTYuNDM0LjQzNGwxLjEzMiAxLjEzMkwxMC4xMyA5bDcuNDM1IDcuNDM0LTEuMTMyIDEuMTMyTDkgMTAuMTNsLTcuNDM0IDcuNDM1LTEuMTMyLTEuMTMyTDcuODcgOSAuNDM0IDEuNTY2IDEuNTY2LjQzNCA5IDcuODd6Ii8+CiAgICA8L2RlZnM+CiAgICA8dXNlIGZpbGw9IiMzMjMyMzIiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI2EiLz4KPC9zdmc+Cg=="
                    alt=""
                />
            </button>
        </div>

        <div class="my-3 pl-3 cursor-pointer">
            <a
                href="/"
                class="bg-blue-400 px-4 py-1 text-white rounded-lg"
            >
                로그인
            </a>
        </div>

        <div class="my-3 pl-3 cursor-pointer">
            <a
                href="/"
                class="bg-emerald-400 px-4 py-1 text-white rounded-lg"
            >
                회원가입
            </a>
        </div>
        <hr />

        {#each navs as nav}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="my-3 ml-3 font-semibold cursor-pointer"
                on:click={() => {
                    if (nav.href) {
                        goto(nav.href);
                    } else {
                        console.log(nav.query);
                    }
                    sideBarStatus = !sideBarStatus;
                }}
            >
                {nav.title}
            </div>
        {/each}
    </div>
    <div class:backdrop={sideBarStatus} use:close_sidebar />
</div>

<style>
    .set_rect {
        position: fixed;
        top: 0px;
        left: 0;
        width: 70%;
        max-width: 300px;
        height: 100%;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
        z-index: 50;
        background-color: #fff;
        padding: 1rem;
    }
    .open_rect {
        /* transition: all 0.5s; */
        transform: translateX(0);
        box-shadow: 0 0 6.25rem 0 rgba(0, 0, 0, 0.1);
    }

    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 40;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s;
    }
</style>
