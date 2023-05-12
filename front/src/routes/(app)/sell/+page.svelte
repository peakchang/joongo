<script>
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import "swiper/css";
    import { onMount } from "svelte";

    let chk1 = false;
    const testFunc = () => {
        chk1 = !chk1
        console.log(chk1);
    }
</script>

<div class="set-height px-2 max-w-2xl mx-auto bg-white pt-20 pb-5 suit-font">
    <button on:click={testFunc}>하하하하</button>
    <Swiper on:slideChange={() => console.log("slide change")}>
        <SwiperSlide>
            Slide1 swiper-no-swiping

            <div
                class="bg-white w-4/5 mx-auto py-5 px-3 rounded-xl shadow-lg border-t-4 h-1/2"
            >
                <div class="font-medium mb-10">
                    <p>견적 확인하실</p>
                    <p>모델을 선택해주세요</p>
                </div>

                <div class="px-8">
                    <div class="border-b pb-2">
                        <i class="fa-solid fa-magnifying-glass" />
                        <span class="ml-2">모델 선택하기</span>
                    </div>
                </div>
            </div>

        </SwiperSlide>

        <SwiperSlide>Slide2</SwiperSlide>

        {#if chk1}
        <SwiperSlide>Slide3</SwiperSlide>
        {/if}
    </Swiper>
</div>



<style>
    .set-height {
        height: 100vh;
    }

    :global(.swiper-wrapper) {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    :global(.swiper-slide){

    }
</style>
