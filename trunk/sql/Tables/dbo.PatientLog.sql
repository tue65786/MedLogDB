SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
SET ANSI_PADDING OFF
GO
CREATE TABLE [dbo].[PatientLog] (
		[PatientLogID]           [int] NOT NULL,
		[PatientID]              [int] NOT NULL,
		[PatientLogTypeID]       [int] NOT NULL,
		[PatientLogDateTime]     [datetime] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PatientLog]
	ADD
	CONSTRAINT [PK_PatientLog]
	PRIMARY KEY
	CLUSTERED
	([PatientLogID])
	ON [PRIMARY]
GO
ALTER TABLE [dbo].[PatientLog]
	WITH CHECK
	ADD CONSTRAINT [FK_PatientLog_PatienLogType]
	FOREIGN KEY ([PatientLogTypeID]) REFERENCES [dbo].[PatienLogType] ([PatientLogTypeID])
ALTER TABLE [dbo].[PatientLog]
	CHECK CONSTRAINT [FK_PatientLog_PatienLogType]

GO
ALTER TABLE [dbo].[PatientLog]
	WITH CHECK
	ADD CONSTRAINT [FK_PatientLog_Patient]
	FOREIGN KEY ([PatientID]) REFERENCES [dbo].[PatientUser] ([PatientID])
ALTER TABLE [dbo].[PatientLog]
	CHECK CONSTRAINT [FK_PatientLog_Patient]

GO
ALTER TABLE [dbo].[PatientLog] SET (LOCK_ESCALATION = TABLE)
GO
