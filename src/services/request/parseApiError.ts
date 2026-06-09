import { AxiosError, HttpStatusCode } from "axios";

export const parseApiError = (error: unknown): string[] => {
    const messages: string[] = [];

    if (!error || typeof error !== "object") {
        return ["Erro desconhecido"];
    }

    if ("isAxiosError" in error && (error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<unknown>;
        const status = axiosError.response?.status;
        const data = axiosError.response?.data;

        if (data) {
            if (typeof data === "string") {
                messages.push(data);
            } else if (Array.isArray(data)) {
                data.forEach((msg) => messages.push(String(msg)));
            } else if (typeof data === "object") {
                // 🔒 Fazemos um cast seguro para objeto indexável
                const recordData = data as Record<string, unknown>;
                const keysToCheck = ["detail", "message", "error", "errors", "commitments"];

                keysToCheck.forEach((key) => {
                    const value = recordData[key];
                    if (value) {
                        if (typeof value === "string") {
                            messages.push(value);
                        } else if (Array.isArray(value)) {
                            value.forEach((msg) => messages.push(String(msg)));
                        } else {
                            messages.push(JSON.stringify(value));
                        }
                    }
                });

                if (messages.length === 0) {
                    const firstKey = Object.keys(recordData)[0];
                    const value = recordData[firstKey];
                    if (value) {
                        if (typeof value === "string") {
                            messages.push(value);
                        } else if (Array.isArray(value)) {
                            value.forEach((msg) => messages.push(String(msg)));
                        } else {
                            messages.push(JSON.stringify(value));
                        }
                    }
                }
            }
        }

        if (messages.length === 0) {
            switch (status) {
                case HttpStatusCode.BadRequest:
                    messages.push("Requisição inválida. Verifique os dados enviados.");
                    break;
                case HttpStatusCode.Unauthorized:
                    messages.push("Você não tem autorização para executar esta ação.");
                    break;
                case HttpStatusCode.Forbidden:
                    messages.push("Acesso negado. Verifique suas permissões.");
                    break;
                case HttpStatusCode.NotFound:
                    messages.push("Recurso não encontrado.");
                    break;
                case HttpStatusCode.InternalServerError:
                    messages.push("Erro interno no servidor. Tente novamente mais tarde.");
                    break;
                case HttpStatusCode.ServiceUnavailable:
                    messages.push("Serviço indisponível no momento. Tente novamente em instantes.");
                    break;
                default:
                    messages.push("Erro desconhecido. Tente novamente.");
                    break;
            }
        }
    }

    if (messages.length === 0) {
        messages.push("Erro desconhecido");
    }

    return messages;
};
