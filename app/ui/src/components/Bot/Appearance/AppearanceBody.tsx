import { Form } from "antd";
import { AppearanceType } from "./types";
import React from "react";
import { AppearanceForm } from "./AppearanceForm";
import { AppearancePreview } from "./AppearancePreview";

type Props = AppearanceType;

export const AppearanceBody = (props: Props) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      ...props,
    });
  }, [props.data]);

  return (
    <div >
      <div className="mx-auto max-w-3xl lg:max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <AppearanceForm initialData={props} form={form} />
                </div>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <AppearancePreview form={form}/>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
