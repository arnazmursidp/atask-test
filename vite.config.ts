/// <reference types="vitest/config" />
import '@testing-library/dom'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths({ root: './' })],
  base: "/atask-test",
		test: {
			logHeapUsage: true,
			globals: true,
			setupFiles: './__test__/setupFile.ts',
			environment: 'jsdom',
			coverage: {
				provider: 'istanbul',
				reporter: ['clover', 'json', 'lcov', 'text', 'json-summary'],
			},
			deps: {
				inline: ['moment', '@ant-design/react-slick', 'dayjs'],
			},
			cache: {
				dir: '../../node_modules/.vitest',
			},
			include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		},
})

