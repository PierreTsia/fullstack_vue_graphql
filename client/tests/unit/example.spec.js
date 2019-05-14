import { shallowMount } from "@vue/test-utils";
import Home from "@/components/Home.vue";

describe("Home.vue", () => {
  it("renders a component", () => {
    const wrapper = shallowMount(Home);
    console.log(wrapper)
    return true
  });
});
