import Section from "../ui/Section";
import Container from "../ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <Section>
      <Container className="h-screen flex justify-center items-center">
        <Button label="button" />
      </Container>
    </Section>
  );
}
