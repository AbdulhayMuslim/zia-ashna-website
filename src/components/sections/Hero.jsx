import Section from "../ui/Section";
import Container from "../ui/Container";
import Button from "@/components/ui/Button";
import SectionTitle from "../ui/SectionTitle";

export default function Hero() {
  return (
    <Section>
      <Container className="h-screen flex flex-col justify-center items-center gap-8">
        <Button label="Get In Touch" />
        <SectionTitle title="Sayed Zia Ashna" />
      </Container>
    </Section>
  );
}
