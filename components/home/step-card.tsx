import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

export default function StepCard({ step, title, description }: StepCardProps) {
  return (
    <Card>
      <CardHeader>
        <span className="text-4xl font-extrabold text-primary/25">{step}</span>
        <CardTitle className="mt-1">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
