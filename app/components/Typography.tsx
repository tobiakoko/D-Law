import React from 'react';
import { cn } from '~/lib/utils';




// Layout Component
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => (
  <div className={cn("min-h-screen bg-body-bg font-raleway", className)}>
    {children}
  </div>
);

{/* Typography Examples
// Example Usage Component
export const ExampleUsage: React.FC = () => (
  <Layout className="p-8 space-y-8">
    
    <section className="space-y-4">
      <H1>Heading 1 Example</H1>
      <H2>Heading 2 Example</H2>
      <H3>Heading 3 Example</H3>
      <Subheader>This is a subheader with letter spacing</Subheader>
      <TextRegular>This is regular body text that demonstrates the typography system.</TextRegular>
    </section>

   
    <section className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="text">Text Button</Button>
        <Button variant="primary" size="small">Small</Button>
        <Button variant="primary" size="large">Large</Button>
        <Button variant="primary" fullWidth>Full Width</Button>
      </div>
    </section>

    
    <section className="space-y-4">
      <div className="space-x-4">
        <TextLink href="#" variant="default">Regular Link</TextLink>
        <TextLink href="#" variant="fancy">Fancy Link with Arrow</TextLink>
      </div>
    </section>

    
    <section className="max-w-md">
      <Form>
        <FormInput
          label="First Name"
          placeholder="Enter your first name"
          type="text"
        />
        <FormInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          error="Please enter a valid email"
        />
        <FormInput
          label="Valid Input"
          placeholder="This field is valid"
          type="text"
          isValid={true}
        />
        <Button variant="primary" type="submit" fullWidth>
          Submit Form
        </Button>
      </Form>
    </section>
  </Layout>
);

 */}