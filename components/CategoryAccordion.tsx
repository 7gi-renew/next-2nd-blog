import { Box, Flex, Popover } from "@radix-ui/themes";
import CategoryAccordionInner from "./CategoryAccordionInner";

export default function CategoryAccordion() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button aria-expanded="true" className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm transition-colors hover:border-red-700 hover:text-red-700 data-[state=open]:border-red-700 data-[state=open]:text-red-700">
          カテゴリ
        </button>
      </Popover.Trigger>
      <Popover.Content width="220px">
        <Flex gap="3">
          <Box flexGrow="1">
            <CategoryAccordionInner />
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
