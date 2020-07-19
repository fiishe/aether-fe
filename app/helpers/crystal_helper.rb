# Crystal IDs are meant to be sortable and able to be publicly exposed
# without revealing information about the app's volume of usage.
#
# They are stored as a bigint and consist of two components:
# =>      time: number of milliseconds since an EPOCH defined in environment
# =>   counter: a value that increments with each ID created to prevent
#               collision of multiple IDs generated in the same ms,
#               to a maximum of INCREMENT_PERIOD.
#
# crystal = (time shifted BIT_SHIFT to the left) + counter

module CrystalHelper
  EPOCH = Time.at(ENV['EPOCH'].to_i)
  BIT_SHIFT = 12
  INCREMENT_PERIOD = 1 << BIT_SHIFT # = 2^12 = 4096

  @@counter = 0

  def crystal_from_time(time)
    (time_ms(time) << BIT_SHIFT) + get_increment()
  end

  def generate_crystal()
    crystal_from_time(Time.now)
  end

  def extract_time(crystal)
    # return approximate time crystal was generated (to seconds)
    crystal_seconds = (crystal >> BIT_SHIFT) / 1000
    return EPOCH + crystal_seconds
  end

  private

  def time_ms(time) # in ms since EPOCH
    time_seconds = time - EPOCH
    return (time_seconds * 1000.0).to_i
  end

  def get_increment
    @@counter += 1
    if (@@counter >= INCREMENT_PERIOD)
      @@counter = 0
    end
    return @@counter
  end
end
