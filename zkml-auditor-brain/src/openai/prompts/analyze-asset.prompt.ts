import { HumanMessage, SystemMessage, BaseMessageLike } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export const template = `
You are an auditor specializing in legal compliance for businesses. Your task is to review the provided screenshots of a website or application. 

Instructions:

1. Considerations:
   - Identify any legal requirements that are currently missing or incorrectly implemented based on widely recognized legal standards (e.g., GDPR, CCPA, ADA, etc.).
   - Highlight areas where the business could potentially be non-compliant with these laws.

2. Improvements:
   - Suggest specific improvements to ensure full compliance with relevant laws.
   - Recommend best practices for enhancing legal safeguards and protecting user rights.

3. Summary:
   - Summarize the overall legal status of the website or application.
   - Provide a concise assessment of whether the current setup meets legal standards, and what steps are necessary to achieve full compliance.

Guidelines:
- Avoid making assumptions or estimations. Only base your analysis on the information visible in the screenshots.
- Ensure your feedback is clear, actionable, and grounded in established legal frameworks.

Example output:

#### Considerations

1. **Data Protection and Privacy Laws**: 
   - **GDPR**: If users from the EU or EEA are involved, the website must have clear consent mechanisms for data collection. This includes explanations on data usage, retention policies, and user rights (e.g., access, portability, and deletion).

2. **User Authentication and Data Security**:
   - The platform collects sensitive information (e.g., usernames, emails, passwords). Compliance with security measures (e.g., encryption for data storage and transmission) is essential.

#### Improvements

1. **Implement a Comprehensive Privacy Policy**:
   - Draft and display a comprehensive Privacy Policy that outlines data collection, use, and user rights to comply with GDPR and CCPA requirements.

2. **Add Clear Opt-In and Opt-Out Mechanisms**:
   - Users should be required to actively consent to data collection practices, and clear options for opting out should be provided, especially for California residents.

#### Summary

The overall legal status of the ZKML website raises several compliance concerns primarily related to privacy laws, user data protection, and accessibility. Currently, the platform seems to lack essential legal documents such as a Privacy Policy and Terms of Service, and verifiable consent mechanisms appear to be missing or inadequate.
`;

// export const analyzeAssetPrompt = ChatPromptTemplate.fromMessages([
//   new SystemMessage("You are a helpful assistant."),
//   new HumanMessage(template),
// //   new MessagesPlaceholder("images"),
// ]);

export const analyzeMessage: BaseMessageLike[] = [
  new SystemMessage("You are a helpful assistant."),
  new HumanMessage(template)
];
