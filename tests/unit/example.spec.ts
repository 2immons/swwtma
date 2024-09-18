import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/MainLogo.vue";

describe("MainLogo.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
