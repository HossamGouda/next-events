import {Fragment} from "react";
import ResultsTitle from "@/components/events/results-title";
import {useRouter} from "next/router";
import {getFilteredEvents} from "@/dummy-data";
import EventList from "@/components/events/event-list";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

function FilteredEventsPage() {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className='center'>Loading...</p>;
  }
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invaild Filter Please Adjust your Values</p>;
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filterdEvents = getFilteredEvents({year: numYear, month: numMonth});
  if (!filterdEvents || filterdEvents.length == 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events Found for The Chosen filter!!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filterdEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
