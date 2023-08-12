import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import React from "react";
import { SkeletonLoading } from "../../components/Common/SkeletonLoading";
import { Cooking } from "../../components/Common/Cooking";
import { PreviewIframe } from "../../components/Bot/Preview/PreviewIFrame";

export default function BotPreviewRoot() {
  const param = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, status } = useQuery(
    ["getBotPreview", param.id],
    async () => {
      const response = await api.get(`/bot/${param.id}/embed`);
      return response.data as {
        inProgress: boolean;
        public_id: string;
      };
    },
    {
      enabled: !!param.id,
      refetchInterval: 1000,
    }
  );

  React.useEffect(() => {
    if (status === "error") {
      navigate("/");
    }
  }, [status]);
  return (
    <>
      {status === "loading" && <SkeletonLoading />}
      {status === "success" && data.inProgress && <Cooking />}
      {status === "success" && !data.inProgress && (
        <PreviewIframe public_id={data.public_id} />
      )}
    </>
  );
}
