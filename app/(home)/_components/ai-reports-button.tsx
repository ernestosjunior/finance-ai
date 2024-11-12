"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReports } from "../_actions/generate-ai-reports";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";
import html2pdf from "html2pdf.js";

interface AiReportsButtonProps {
  month: string;
  isPremiumPlan: boolean;
}

const AiReportsButton = ({ month, isPremiumPlan }: AiReportsButtonProps) => {
  const [reportsIsLoading, setReportsIsLoading] = useState(false);
  const [reports, setReports] = useState<string | null>(null);

  const handleGenerateReports = async () => {
    try {
      setReportsIsLoading(true);
      const aiReports = await generateAiReports({ month });
      setReports(aiReports);
    } catch (error) {
      console.log(error);
    } finally {
      setReportsIsLoading(false);
    }
  };

  const exportPDF = () => {
    const element = document.getElementById("markdown-content");
    html2pdf()
      .set({
        margin: 1,
        filename: "report.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReports(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-bold">
          Relatótio IA <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {isPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatótio IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <span id="markdown-content">
                <Markdown>{reports}</Markdown>
              </span>
            </ScrollArea>
            <DialogFooter
              className={`flex items-center ${reports ? "!justify-between" : ""}`}
            >
              {reports && (
                <Button variant="link" onClick={exportPDF}>
                  Exportar PDF
                </Button>
              )}
              <div className="flex items-center gap-4">
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button
                  disabled={reportsIsLoading || !!reports}
                  onClick={handleGenerateReports}
                >
                  {reportsIsLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Gerar relatório"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatótio IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportsButton;
