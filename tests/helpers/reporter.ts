import {
    DisplayProcessor,
    SpecReporter,
    StacktraceOption
} from "jasmine-spec-reporter";
import CustomReporter = jasmine.CustomReporter;
{/* 
  // @ts-ignore */}
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`;
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
    new SpecReporter({
        suite: {
            displayNumber: true  
        },
        spec: {
            displayStacktrace: StacktraceOption.NONE
        },
        customProcessors: [CustomProcessor]
    }) as unknown as CustomReporter
);
