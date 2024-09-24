import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/EarthSection.vue";

describe("EarthSection.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
