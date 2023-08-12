import {
  Col,
  Divider,
  Form,
  FormInstance,
  Row,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import { RadioGroup } from "@headlessui/react";
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { availableEmbeddingTypes } from "../../utils/embeddings";
import { availableChatModels } from "../../utils/chatModels";
import { SpiderIcon } from "./SpiderIcon";
import { GithubIcon } from "./GithubIcon";

type Props = {
  createBot: (values: any) => void;
  isLoading: boolean;
  setSelectedSource: React.Dispatch<React.SetStateAction<any>>;
  form: FormInstance<any>;
  showEmbeddingAndModels: boolean;
};
// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const BotForm = ({
  createBot,
  isLoading,
  setSelectedSource,
  form,
  showEmbeddingAndModels,
}: Props) => {
  const [availableSources] = React.useState([
    {
      id: 1,
      value: "website",
      title: "Webpage",
      icon: GlobeAltIcon,
      formComponent: (
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Please enter the webpage URL",
            },
          ]}
        >
          <input
            type="url"
            placeholder="Enter the webpage URL"
            className=" block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />
        </Form.Item>
      ),
    },
    {
      id: 3,
      value: "text",
      title: "Text",
      icon: DocumentTextIcon,
      formComponent: (
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Please enter the text",
            },
          ]}
        >
          <textarea
            placeholder="Enter the text"
            className=" block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />
        </Form.Item>
      ),
    },
    {
      id: 2,
      value: "file",
      title: "File (beta)",
      icon: DocumentArrowUpIcon,
      formComponent: (
        <>
          <Form.Item
            name="file"
            rules={[
              {
                required: true,
                message: `Please upload your files (PDF, Docx, CSV, TXT, MP3, MP4)`,
              },
            ]}
            getValueFromEvent={(e) => {
              console.log("Upload event:", e);
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload.Dragger
              accept={`.pdf,.docx,.csv,.txt,.mp3,.mp4`}
              multiple={true}
              maxCount={10}
              beforeUpload={(file) => {
                const allowedTypes = [
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "text/csv",
                  "text/plain",
                  "audio/mpeg",
                  "audio/mp4",
                  "video/mp4",
                  "video/mpeg",
                ]
                  .map((type) => type.toLowerCase())
                  .join(", ");

                console.log("file type:", file.type.toLowerCase());

                if (!allowedTypes.includes(file.type.toLowerCase())) {
                  message.error(
                    `File type not supported. Please upload a ${allowedTypes} file.`
                  );
                  return Upload.LIST_IGNORE;
                }

                // if video or audio
                if (
                  file.type.toLowerCase().includes("audio") ||
                  file.type.toLowerCase().includes("video")
                ) {
                  message.warning(
                    `Currently, Only support video and audio files with English audio`
                  );
                }

                return false;
              }}
            >
              <div className="p-3">
                <p className="ant-upload-drag-icon justify-center flex">
                  <InboxIcon className="h-10 w-10 text-gray-400" />
                </p>
                <p className="ant-upload-text">
                  Click or drag PDF, Docx, CSV , TXT, MP3, MP4 files to this
                </p>
                <p className="ant-upload-hint">
                  Support is available for a single or bulk upload of up to 10
                  files. Please note that file upload is in beta, so if you
                  encounter any issues, kindly report them.
                </p>
              </div>
            </Upload.Dragger>
          </Form.Item>
          <p className="text-sm text-gray-500">
            If you find any issues, please report them on{" "}
            <a
              href={`https://github.com/n4ze3m/dialoqbase/issues/new?title=file%20upload%20issue&type=bug&labels=bug`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              GitHub
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 4,
      value: "crawl",
      title: "Crawler (beta)",
      icon: SpiderIcon,
      formComponent: (
        <>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Please enter the website URL",
              },
            ]}
          >
            <input
              type="url"
              placeholder="Enter the website URL"
              className=" block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="maxDepth"
            help="The max depth of the website to crawl"
            rules={[
              {
                required: true,
                message: "Please input max depth!",
              },
            ]}
          >
            <input
              type="number"
              placeholder="Enter the max depth"
              className=" block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="maxLinks"
            help="The max links to crawl"
            rules={[
              {
                required: true,
                message: "Please input max links count",
              },
            ]}
          >
            <input
              type="number"
              placeholder="Enter the max depth"
              className=" block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </Form.Item>

          <p className="text-sm text-gray-500">
            If you find any issues, please report them on{" "}
            <a
              href="https://github.com/n4ze3m/dialoqbase/issues/new?title=Crawler%20issue&labels=bug"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              GitHub
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 6,
      value: "github",
      title: "GitHub (beta)",
      icon: GithubIcon,
      formComponent: (
        <>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Please enter the public github repo URL",
              },
              {
                pattern: new RegExp(
                  "^(https?://)?(www.)?github.com/([a-zA-Z0-9-]+)/([a-zA-Z0-9-]+)(.git)?$"
                ),
                message: "Please enter a valid public github repo URL",
              },
            ]}
          >
            <input
              type="url"
              placeholder="Enter the github repo URL"
              className=" block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </Form.Item>
          <Row
          gutter={16}
          >
            <Col span={12}>
              <Form.Item
                name={["options", "branch"]}
                label="Branch"
                rules={[
                  {
                    required: true,
                    message: "Please input branch",
                  },
                ]}
              >
                <input
                  type="text"
                  placeholder="Enter the branch"
                  className=" block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Private repo?" name={["options", "is_private"]}>
                <Switch 
                className="mr-2" />
              </Form.Item>
            </Col>
          </Row>

          <p className="text-sm text-gray-500">
            If you find any issues, please report them on{" "}
            <a
              href="https://github.com/n4ze3m/dialoqbase/issues/new?title=Github%20issue&labels=bug"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              GitHub
            </a>
            .
          </p>
        </>
      ),
    },
  ]);

  const [selectedSource, _setSelectedSource] = React.useState<any>(
    availableSources[0]
  );

  const embeddingType = Form.useWatch("embedding", form);

  return (
    <Form
      layout="vertical"
      onFinish={createBot}
      form={form}
      className="space-y-6"
      initialValues={{
        embedding: "openai",
        model: "gpt-3.5-turbo",
        maxDepth: 2,
        maxLinks: 10,
        options: {
          branch: "main",
          is_private: false,
        },
      }}
    >
      <RadioGroup
        value={selectedSource}
        onChange={(e: any) => {
          _setSelectedSource(e);
          setSelectedSource(e);
        }}
      >
        <RadioGroup.Label className="text-base font-medium text-gray-800">
          Select a data source
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          {availableSources.map((source) => (
            <RadioGroup.Option
              key={source.id}
              value={source}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                  "relative  items-center justify-center flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex-shrink-0 flex items-center justify-centerrounded-lg">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      <source.icon
                        className="h-6 w-6 mr-3"
                        aria-hidden="true"
                      />
                    </RadioGroup.Label>
                    {source.title}
                  </span>

                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      {selectedSource.formComponent}

      <Form.Item hidden={!showEmbeddingAndModels} noStyle>
        <Divider />
      </Form.Item>

      <Form.Item
        hidden={!showEmbeddingAndModels}
        label={
          <span className="font-medium text-gray-800 text-sm">Chat Model</span>
        }
        name="model"
      >
        <Select
          placeholder="Select a chat model"
          options={availableChatModels}
        />
      </Form.Item>

      <Form.Item
        hidden={!showEmbeddingAndModels}
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
        validateStatus={embeddingType === "tensorflow" ? "warning" : undefined}
      >
        <Select
          placeholder="Select an embedding method"
          options={availableEmbeddingTypes}
        />
      </Form.Item>

      <Form.Item>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </Form.Item>
    </Form>
  );
};
