import { Box, Button, Flex, Popover } from "@radix-ui/themes";
import CategoryAccordionInner from "./CategoryAccordionInner";

export default function CategoryAccordion() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          カテゴリ
        </Button>
      </Popover.Trigger>
      <Popover.Content width="360px">
        <Flex gap="3">
          <Box flexGrow="1">
            <Flex gap="3" mt="3" justify="between">
              <Flex align="center" gap="2" asChild>
                <CategoryAccordionInner />
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
