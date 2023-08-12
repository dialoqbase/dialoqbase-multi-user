import { Form, notification, Select, Slider, Switch } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { availableEmbeddingTypes } from "../../../utils/embeddings";
import {
  availableChatModels,
  isStreamingSupported,
} from "../../../utils/chatModels";
import axios from "axios";
import React from "react";

export const SettingsCard = ({
  data,
}: {
  data: {
    id: string;
    name: string;
    model: string;
    public_id: string;
    temperature: number;
    embedding: string;
    qaPrompt: string;
    questionGeneratorPrompt: string;
    streaming: boolean;
    showRef: boolean;
  };
}) => {
  const [form] = Form.useForm();
  const [disableStreaming, setDisableStreaming] = React.useState(false);
  const params = useParams<{ id: string }>();

  const client = useQueryClient();

  const onFinish = async (values: any) => {
    const response = await api.put(`/bot/${params.id}`, values);
    return response.data;
  };

  const { mutate: updateBotSettings, isLoading } = useMutation(onFinish, {
    onSuccess: () => {
      client.invalidateQueries(["getBotSettings", params.id]);

      notification.success({
        message: "Bot updated successfully",
      });
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Something went wrong";
        notification.error({
          message,
        });
        return;
      }
      notification.error({
        message: "Something went wrong",
      });
    },
  });

  const navigate = useNavigate();

  const onDelete = async () => {
    const response = await api.delete(`/bot/${params.id}`);
    return response.data;
  };

  const { mutate: deleteBot, isLoading: isDeleting } = useMutation(onDelete, {
    onSuccess: () => {
      client.invalidateQueries(["getAllBots"]);

      navigate("/");

      notification.success({
        message: "Bot deleted successfully",
      });
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Something went wrong";
        notification.error({
          message,
        });
        return;
      }

      notification.error({
        message: "Something went wrong",
      });
    },
  });

  const embeddingType = Form.useWatch("embedding", form);
  const currentModel = Form.useWatch("model", form);

  React.useEffect(() => {
    if (!isStreamingSupported(currentModel) && currentModel) {
      form.setFieldsValue({
        streaming: false,
      });
      setDisableStreaming(true);
    } else {
      setDisableStreaming(false);
    }
  }, [currentModel]);

  return (
    <div className="space-y-3">
      <Form
        initialValues={{
          name: data.name,
          model: data.model,
          temperature: data.temperature,
          embedding: data.embedding,
          qaPrompt: data.qaPrompt,
          questionGeneratorPrompt: data.questionGeneratorPrompt,
          streaming: data.streaming,
          showRef: data.showRef,
        }}
        form={form}
        requiredMark={false}
        onFinish={updateBotSettings}
        layout="vertical"
        className="space-y-6 mb-6 bg-white "
      >
        <div className="px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                General Settings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Bot general settings and information.
              </p>
            </div>
            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <Form.Item
                name="name"
                label="Project Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Project Name!",
                  },
                ]}
              >
                <input
                  type="text"
                  className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </Form.Item>

              <Form.Item
                name="model"
                label="Model"
                rules={[
                  {
                    required: true,
                    message: "Please select a model!",
                  },
                ]}
              >
                <Select options={availableChatModels} />
              </Form.Item>

              <Form.Item
                hasFeedback={!isStreamingSupported(currentModel)}
                help={
                  !isStreamingSupported(currentModel) &&
                  "Streaming is not supported for this model."
                }
                name="streaming"
                label="Streaming"
                valuePropName="checked"
              >
                <Switch disabled={disableStreaming} />
              </Form.Item>

              <Form.Item
                name="showRef"
                label="Cite sources in the chat"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="temperature"
                label="Temperature"
                rules={[
                  {
                    required: true,
                    message: "Please select a temperature!",
                  },
                ]}
              >
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-medium text-gray-800 text-sm">
                    Embedding model
                  </span>
                }
                name="embedding"
                hasFeedback={embeddingType === "tensorflow"}
                help={
                  embeddingType === "tensorflow"
                    ? "TensorFlow embeddings can be slow and memory-intensive."
                    : null
                }
                validateStatus={
                  embeddingType === "tensorflow" ? "warning" : undefined
                }
              >
                <Select
                  disabled
                  placeholder="Select an embedding method"
                  options={availableEmbeddingTypes}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-medium text-gray-800 text-sm">
                    Question Answering Prompt (System Prompt)
                  </span>
                }
                name="qaPrompt"
                rules={[
                  {
                    required: true,
                    message: "Please input a prompt!",
                  },
                ]}
              >
                <textarea
                  className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  rows={5}
                  placeholder=""
                />
              </Form.Item>
            </div>
          </div>

          <div className="mt-3 text-right">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Form>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Delete your bot
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              This action cannot be undone. This will permanently delete your
              bot and all of its data.
            </p>
          </div>
          <div className="mt-5">
            <button
              onClick={() => {
                const confirm = window.confirm(
                  "Are you sure you want to delete this bot?"
                );
                if (confirm) {
                  deleteBot();
                }
              }}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
            >
              {isDeleting ? "Deleting..." : "Delete bot"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
