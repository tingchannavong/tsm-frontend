  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: (() => {
      const params = new URLSearchParams(window.location.search);
      // console.log('params', params);
      // params.entries() loop through key-value pair, Object.fromEntries() make it into object
      const urlFilters = Object.fromEntries(params.entries());

      const defaultFilters = {
        status: "ACTIVE",
        locationId: "all",
        page: 1,
        limit: 5,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
      };

      return {
        ...defaultFilters,
        ...urlFilters,
      };
    })(),
    // resolver: zodResolver(GetSessionsSchema),
  });