interface IExchange {
	id: number;
	name: string;
	websiteUrl: string;
	logoUrl: string;
	companyLogoUrl: string;
	hasApi: boolean;
	hasCsv: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export default IExchange;
