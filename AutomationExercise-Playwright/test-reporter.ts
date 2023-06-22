import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class MyReporter implements Reporter {
  private testReportsDir: string;

  constructor() {
    this.testReportsDir = path.join(__dirname, 'test-reports');
    fs.mkdirSync(this.testReportsDir, { recursive: true });
  }

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase, result: TestResult) {
    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);

    const data = {
      test: test.title,
      status: result.status,
      executionTime: result.duration,
      errors: result.errors,
    };

    const filePath = path.join(this.testReportsDir, `${test.title}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Report for ${test.title} saved: ${filePath}`);
  }

  onEnd(results: FullResult) {
    console.log(`Finished the run: ${results.status}`);
  }
}

export default MyReporter;

// .test-reporter.ts
// npx playwright test --config=playwright.config.ts
// npx playwright test --config=playwright.config.ts testCase01.spec.ts
// npx playwright test --config=playwright.config.ts testCase01PageObjects.spec.ts