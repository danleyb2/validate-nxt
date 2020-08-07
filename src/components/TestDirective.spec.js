import flushPromises from "flush-promises";
import { mount, createLocalVue } from "@vue/test-utils";
import VeeValidate from "vee-validate";
import TestDirective from '@/components/TestDirective'


test("Test the vee-validate directive", async () => {
  const Vue = createLocalVue();
  Vue.use(VeeValidate);
  // important to turn off the sync behavior.
  const wrapper = mount(
    TestDirective,
    { sync: false, localVue: Vue }
  );
  const error = wrapper.find("#error");
  expect(error.text()).toBe("");

  wrapper.vm.value = '';
  await flushPromises();

  expect(error.text()).toBe("The input field is required.");
});
